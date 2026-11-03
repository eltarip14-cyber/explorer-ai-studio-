const input=document.getElementById('fileInput'), list=document.getElementById('fileList'), zone=document.getElementById('dropzone');
let files=[];
function renderFiles(){list.innerHTML='';if(!files.length){list.innerHTML='<p class="muted empty">لم تتم إضافة ملفات بعد.</p>';return;}
files.forEach((f,i)=>{const row=document.createElement('div');row.className='file-item';const name=document.createElement('span');name.textContent=`${f.name} · ${(f.size/1024/1024).toFixed(1)} MB`;const remove=document.createElement('button');remove.textContent='حذف';remove.onclick=()=>{files.splice(i,1);renderFiles();};row.append(name,remove);list.append(row);});}
function addFiles(incoming){for(const f of incoming){if(f.size>25*1024*1024){alert(`الملف ${f.name} أكبر من 25MB`);continue;}files.push(f);}renderFiles();const image=files.find(f=>f.type.startsWith('image/'));if(image){const url=URL.createObjectURL(image);document.getElementById('previewScreen').style.backgroundImage=`linear-gradient(#0002,#0002),url("${url}")`;document.getElementById('previewScreen').style.backgroundSize='cover';}}
input.addEventListener('change',e=>addFiles(e.target.files));
['dragenter','dragover'].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.style.borderColor='#0b9d6e';}));
['dragleave','drop'].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.style.borderColor='#b9d9c8';}));
zone.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
document.getElementById('generate').addEventListener('click',()=>{
 const prompt=document.getElementById('prompt').value.trim();
 if(!files.length&&!prompt){alert('أضف ملفاً أو اكتب وصف الفيديو أولاً.');return;}
 const data={files:files.map(f=>({name:f.name,type:f.type,size:f.size})),prompt,duration:document.getElementById('duration').value,ratio:document.getElementById('ratio').value,quality:document.getElementById('quality').value};
 const box=document.getElementById('requestResult');box.innerHTML='<strong>تم تجهيز طلبك محلياً ✓</strong><p>هذه بيانات المشروع التي تحتاج خدمة توليد فيديو لمعالجتها:</p><pre></pre><p>لم يتم إنشاء فيديو فعلي بعد. اربط خادم توليد فيديو ومفتاح API لتفعيل الإنشاء والتنزيل.</p>';
 box.querySelector('pre').textContent=JSON.stringify(data,null,2);
 document.querySelector('.status').textContent='الطلب جاهز';
});
