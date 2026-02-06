'use server';

import { revalidatePath } from 'next/cache';

/**
 * Server Action to delete an item (soft delete)
 */
export async function deleteItem(imageId, sellerId, role) {
    try {
        const response = await fetch(`http://localhost:5000/api/seller/image/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sellerId, role }),
        });

        const data = await response.json();

        if (data.success) {
            revalidatePath('/');
            return { success: true, message: data.message };
        } else {
            console.error('Backend removal failed:', data.message);
            return { success: false, message: data.message || 'Failed to remove item' };
        }
    } catch (error) {
        console.error('Error in deleteItem action:', error);
        return { success: false, message: 'An unexpected connection error occurred' };
    }
}
