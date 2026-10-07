import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  let fileName = 'fiber_husk_png_1791393504978.png';
  if (name === 'strongman') {
    fileName = 'vintage_strongman_1791394822136.png';
  } else if (name === 'strongman2') {
    fileName = 'guarantee_character_1791395884161.png';
  } else if (name === 'strongman_wheat') {
    fileName = 'strongman_wheat_1791397557995.png';
  }

  const filePath = 'C:\\Users\\manis\\.gemini\\antigravity-ide\\brain\\9ecbea94-86db-40d8-9dea-8af1611d705a\\' + fileName;
  
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: { 
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
