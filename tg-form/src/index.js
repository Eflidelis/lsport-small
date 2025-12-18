const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // ✅ Обработка CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }

    const data = await request.json();

    const text = `
📝 Новая заявка с сайта

Имя: ${data.name || '-'}
Телефон: ${data.phone || '-'}
Email: ${data.email || '-'}
Организация: ${data.company || '-'}
ИНН: ${data.inn || '-'}
Комментарий: ${data.comment || '-'}
    `.trim();

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          chat_id: env.CHAT_ID,
          text,
        }),
      }
    );

    if (!tgResponse.ok) {
      return new Response('Telegram error', {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response('OK', {
      status: 200,
      headers: corsHeaders,
    });
  },
};
