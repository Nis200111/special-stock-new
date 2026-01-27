/**
 * Example: Public Gallery Component
 * Demonstrates how to fetch and display ONLY approved images
 * 
 * Use this as a reference for your public-facing gallery pages
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PublicGalleryExample() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        fetchApprovedImages();
    }, [page, category]);

    async function fetchApprovedImages() {
        setLoading(true);
        try {
            // Fetches ONLY approved images from public API
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "20",
                ...(category !== "all" && { category }),
                sortBy: "recent" // or 'popular', 'downloads', 'price-low', 'price-high'
            });

            const response = await fetch(
                `http://localhost:5000/api/public/images?${params}`
            );

            const data = await response.json();

            if (data.success) {
                setImages(data.data.images);
                setTotalPages(data.data.pagination.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch images:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading approved images...</div>;
    }

    return (
        <div className="gallery-container">
            <h1>Public Gallery - Approved Images Only</h1>

            {/* Category Filter */}
            <div className="filters">
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All Categories</option>
                    <option value="photography">Photography</option>
                    <option value="illustration">Illustration</option>
                    <option value="vector">Vector</option>
                    <option value="nature">Nature</option>
                </select>
            </div>

            {/* Images Grid */}
            <div className="images-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-card">
                        {/* 
                            IMPORTANT: Use watermarked version for public display 
                            This protects the seller's original work
                        */}
                        <img
                            src={`http://localhost:5000${image.watermarkedFilepath || image.thumbnailPath}`}
                            alt={image.title}
                            className="gallery-image"
                        />

                        <div className="image-info">
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                            <div className="meta">
                                <span className="category">{image.category}</span>
                                <span className="price">${image.price}</span>
                            </div>
                            <div className="stats">
                                <span>👁 {image.views} views</span>
                                <span>⬇ {image.downloads} downloads</span>
                            </div>
                        </div>

                        <style jsx>{`
                            .image-card {
                                border: 1px solid #e5e7eb;
                                border-radius: 8px;
                                overflow: hidden;
                                transition: transform 0.2s;
                            }

                            .image-card:hover {
                                transform: translateY(-4px);
                                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                            }

                            .gallery-image {
                                width: 100%;
                                height: 250px;
                                object-fit: cover;
                            }

                            .image-info {
                                padding: 1rem;
                            }

                            .image-info h3 {
                                margin: 0 0 0.5rem 0;
                                font-size: 1.125rem;
                                font-weight: 700;
                            }

                            .image-info p {
                                margin: 0 0 1rem 0;
                                color: #6b7280;
                                font-size: 0.875rem;
                            }

                            .meta {
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 0.5rem;
                            }

                            .category {
                                padding: 0.25rem 0.75rem;
                                background: #f3f4f6;
                                border-radius: 4px;
                                font-size: 0.75rem;
                                text-transform: capitalize;
                            }

                            .price {
                                font-size: 1.125rem;
                                font-weight: 700;
                                color: #059669;
                            }

                            .stats {
                                display: flex;
                                gap: 1rem;
                                font-size: 0.75rem;
                                color: #9ca3af;
                            }
                        `}</style>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            <style jsx>{`
                .gallery-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .filters {
                    margin-bottom: 2rem;
                }

                .filters select {
                    padding: 0.75rem 1rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                }

                .images-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                }

                .pagination button {
                    padding: 0.75rem 1.5rem;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                }

                .pagination button:disabled {
                    background: #d1d5db;
                    cursor: not-allowed;
                }

                .pagination span {
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}

/**
 * IMPORTANT NOTES:
 * 
 * 1. This component fetches from /api/public/images
 *    - This endpoint returns ONLY approved images
 *    - Pending and rejected images are never included
 * 
 * 2. Image Display:
 *    - Use watermarkedFilepath for protection
 *    - Use thumbnailPath for grid previews (faster loading)
 *    - Never expose the original filepath to public
 * 
 * 3. The API automatically:
 *    - Filters by status: 'approved'
 *    - Filters by processingStatus: 'completed'
 *    - Excludes the original filepath from response
 * 
 * 4. Available Query Parameters:
 *    - page: Page number (default: 1)
 *    - limit: Items per page (default: 20)
 *    - category: Filter by category
 *    - search: Search in title/description/tags
 *    - sortBy: recent|popular|downloads|price-low|price-high
 * 
 * 5. Example URLs:
 *    - /api/public/images?category=photography
 *    - /api/public/images?search=sunset&sortBy=popular
 *    - /api/public/images?page=2&limit=50
 */
