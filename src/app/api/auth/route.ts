import { NextResponse } from 'next/server';

// Хранилище кодов подтверждения (в реальном приложении должно быть в базе данных)
const verificationCodes = new Map<string, string>();

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ 
        success: false, 
        error: 'Phone number is required' 
      }, { status: 400 });
    }

    // Генерируем код подтверждения
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(phone, verificationCode);

    // В режиме разработки возвращаем код в ответе
    console.log(`Development mode: Code for ${phone}: ${verificationCode}`);
    return NextResponse.json({ 
      success: true, 
      message: 'Development mode: Code returned in response',
      code: verificationCode
    });

  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ 
        success: false, 
        error: 'Phone number and code are required' 
      }, { status: 400 });
    }

    const storedCode = verificationCodes.get(phone);

    if (!storedCode) {
      return NextResponse.json({ 
        success: false, 
        error: 'No verification code found for this number' 
      }, { status: 400 });
    }

    if (code !== storedCode) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid verification code' 
      }, { status: 400 });
    }

    // Удаляем использованный код
    verificationCodes.delete(phone);

    return NextResponse.json({ 
      success: true, 
      message: 'Phone number verified successfully' 
    });
  } catch (error) {
    console.error('Error in PUT handler:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 