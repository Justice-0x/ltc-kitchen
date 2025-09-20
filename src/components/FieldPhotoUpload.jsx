import React, { useState, useRef } from 'react';

export default function FieldPhotoUpload({ 
  equipmentId, 
  modelId, 
  onPhotosChange,
  initialPhotos = [] 
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const newPhotos = await Promise.all(
        files.map(async (file) => {
          // Validate file type
          if (!file.type.startsWith('image/')) {
            throw new Error(`${file.name} is not an image file`);
          }

          // Validate file size (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            throw new Error(`${file.name} is too large (max 10MB)`);
          }

          // Create preview URL
          const previewUrl = URL.createObjectURL(file);
          
          // In a real app, you'd upload to a server here
          // For now, we'll store as base64
          const base64 = await fileToBase64(file);

          return {
            id: Date.now() + Math.random(),
            file,
            previewUrl,
            base64,
            timestamp: new Date().toISOString(),
            equipmentId,
            modelId,
            description: '',
            category: 'general',
            tags: []
          };
        })
      );

      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      
      if (onPhotosChange) {
        onPhotosChange(updatedPhotos);
      }

    } catch (error) {
      alert(`Error uploading photos: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    setPhotos(updatedPhotos);
    
    if (onPhotosChange) {
      onPhotosChange(updatedPhotos);
    }
  };

  const updatePhotoDescription = (photoId, description) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId ? { ...photo, description } : photo
    );
    setPhotos(updatedPhotos);
    
    if (onPhotosChange) {
      onPhotosChange(updatedPhotos);
    }
  };

  const updatePhotoCategory = (photoId, category) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId ? { ...photo, category } : photo
    );
    setPhotos(updatedPhotos);
    
    if (onPhotosChange) {
      onPhotosChange(updatedPhotos);
    }
  };

  const addTag = (photoId, tag) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, tags: [...photo.tags, tag] }
        : photo
    );
    setPhotos(updatedPhotos);
    
    if (onPhotosChange) {
      onPhotosChange(updatedPhotos);
    }
  };

  const removeTag = (photoId, tagToRemove) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, tags: photo.tags.filter(tag => tag !== tagToRemove) }
        : photo
    );
    setPhotos(updatedPhotos);
    
    if (onPhotosChange) {
      onPhotosChange(updatedPhotos);
    }
  };

  const downloadPhotos = () => {
    // Create a zip file with all photos and metadata
    const metadata = {
      equipmentId,
      modelId,
      timestamp: new Date().toISOString(),
      photos: photos.map(photo => ({
        id: photo.id,
        filename: photo.file.name,
        description: photo.description,
        category: photo.category,
        tags: photo.tags,
        timestamp: photo.timestamp
      }))
    };

    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], { 
      type: 'application/json' 
    });
    
    const metadataUrl = URL.createObjectURL(metadataBlob);
    const metadataLink = document.createElement('a');
    metadataLink.href = metadataUrl;
    metadataLink.download = `field-photos-${equipmentId}-${new Date().toISOString().slice(0, 10)}.json`;
    metadataLink.click();
    
    URL.revokeObjectURL(metadataUrl);
  };

  const categories = [
    'general',
    'before-repair',
    'after-repair',
    'problem-area',
    'parts-installed',
    'wiring',
    'plumbing',
    'documentation'
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Field Photo Upload</h2>
      
      {/* Upload Section */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">📷</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Field Photos
          </h3>
          <p className="text-gray-600 mb-4">
            Take photos of equipment, repairs, installations, or issues
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Select Photos'}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Max 10MB per photo, supports JPG, PNG, WebP
          </p>
        </div>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Photos ({photos.length})
            </h3>
            <button
              onClick={downloadPhotos}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Download Metadata
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={photo.previewUrl}
                    alt={photo.description || 'Field photo'}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={photo.category}
                      onChange={(e) => updatePhotoCategory(photo.id, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={photo.description}
                      onChange={(e) => updatePhotoDescription(photo.id, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows="2"
                      placeholder="Describe what's shown in this photo..."
                    />
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {photo.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(photo.id, tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tag..."
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          addTag(photo.id, e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(photo.timestamp).toLocaleString()}
                  </div>
                  
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="w-full px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {photos.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Photo Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Photos:</span> {photos.length}
            </div>
            <div>
              <span className="font-medium">Categories:</span> {new Set(photos.map(p => p.category)).size}
            </div>
            <div>
              <span className="font-medium">With Descriptions:</span> {photos.filter(p => p.description).length}
            </div>
            <div>
              <span className="font-medium">With Tags:</span> {photos.filter(p => p.tags.length > 0).length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
