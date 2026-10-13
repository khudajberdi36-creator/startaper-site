// Cloudflare Worker: Telegram bot tokenini yashirin saqlaydi.
// Sozlash: Variables -> BOT_TOKEN (Secret), CHAT_ID, ORIGIN (saytingiz manzili)
export default{async fetch(req,env){
  const cors={'Access-Control-Allow-Origin':env.ORIGIN||'*','Access-Control-Allow-Headers':'Content-Type'};
  if(req.method==='OPTIONS')return new Response(null,{headers:cors});
  if(req.method!=='POST')return new Response('no',{status:405,headers:cors});
  let b;try{b=await req.json()}catch(e){return new Response('bad',{status:400,headers:cors})}
  if(!b.text||b.text.length>1500)return new Response('bad',{status:400,headers:cors});
  const r=await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:env.CHAT_ID,text:b.text})});
  return new Response(r.ok?'ok':'err',{status:r.ok?200:502,headers:cors})}}
