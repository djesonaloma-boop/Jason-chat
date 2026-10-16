import { getAdmin, USERS_ROOT, FACE_ROOT } from "../backend/firebase.js";

export default async function handler(req,res){
  const { path } = req.query;
  const route = Array.isArray(path)? path.join("/") : path || "";
  const adminDB = getAdmin();

  // POST /api/post
  if(route==="post" && req.method==="POST"){
    const { telephone, nom, text, image } = req.body;
    if(!telephone) return res.status(400).json({error:"telephone requis"});
    await adminDB.ref(FACE_ROOT).push({ telephone, nom: nom||telephone, text, image: image||"", likes:0, createdAt: Date.now(), date: new Date().toLocaleString("fr-FR") });
    return res.json({success:true});
  }

  // POST /api/like
  if(route==="like" && req.method==="POST"){
    const { id } = req.body;
    const ref = adminDB.ref(`${FACE_ROOT}/${id}/likes`);
    const snap = await ref.get();
    await ref.set((snap.val()||0)+1);
    return res.json({success:true});
  }

  return res.json({app:"JASON FACE API", route, method:req.method});
}
