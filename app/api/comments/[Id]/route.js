export async function GET(request, { params }) {

    const postId = params.Id;
  
    const comments = await prisma.comment.findMany({
      where: { postId },
    });
  
    return NextResponse.json(comments);
  }