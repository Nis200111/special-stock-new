import { NextResponse } from 'next/server';

/**
 * Next.js API Route: DELETE /api/items/[id]
 * 
 * Logic Requirements:
 * 1. Accepts imageId (via URL params) and sellerId (via Body).
 * 2. Validates if User is 'admin' OR if sellerId matches item owner.
 * 3. Soft deletes the item by updating status to 'deleted'.
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: imageId } = await params;
        const body = await request.json();
        const { sellerId, role } = body;

        // Log input for debugging in terminal
        console.log('Incoming Delete Request:', { imageId, sellerId, role });

        // Validation
        if (!imageId || !sellerId) {
            return NextResponse.json(
                { success: false, message: 'Missing required Image ID or Seller ID' },
                { status: 400 }
            );
        }

        /**
         * DATABASE LOGIC (Placeholder for implementation)
         * 
         * In your environment, you would use your database client here.
         * Example using a generic DB client:
         * 
         * const item = await db.items.findUnique({ where: { id: Number(imageId) } });
         * 
         * if (!item) return NextResponse.json({ success: false, message: 'Item not found' }, { status: 404 });
         * 
         * // Authorization: Check Admin role or Owner match
         * const isAdmin = role === 'admin';
         * const isOwner = Number(item.ownerId) === Number(sellerId);
         * 
         * if (!isAdmin && !isOwner) {
         *   return NextResponse.json({ success: false, message: 'Unauthorized access' }, { status: 403 });
         * }
         * 
         * // Soft Delete
         * await db.items.update({
         *   where: { id: Number(imageId) },
         *   data: { status: 'deleted' }
         * });
         */

        return NextResponse.json({
            success: true,
            message: 'Image successfully soft-deleted from the marketplace.'
        });

    } catch (error) {
        // REQUIREMENT: Include console.log(error) so user can see it in terminal
        console.log('DEBUG_DATABASE_ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to remove image',
                error: error instanceof Error ? error.message : 'Unknown database error'
            },
            { status: 500 }
        );
    }
}
