(() => {
  const items=window.shopGallery;
  const grid=document.getElementById('gallery-grid');
  const dialog=document.getElementById('gallery-viewer');
  const media=document.getElementById('viewer-media');
  const pageSize=6;
  let filter='all',page=0,current=0,opener=null,touchX=null;
  const en=()=>document.documentElement.lang==='en';
  const selected=()=>items.filter(i=>filter==='all'||i.type===filter);
  function render(){
    const list=selected(),pages=Math.ceil(list.length/pageSize);
    page=Math.max(0,Math.min(page,pages-1));
    grid.replaceChildren(...list.slice(page*pageSize,(page+1)*pageSize).map((item,i)=>{
      const button=document.createElement('button');button.type='button';button.className='gallery-card';
      button.setAttribute('aria-label',(en()?'Open: ':'बड़ा देखें: ')+item[en()?'en':'hi']);
      const picture=document.createElement('span');picture.className='gallery-picture';
      if(item.type==='photo'){
        const image=document.createElement('img');image.src=item.thumb;image.alt=item[en()?'en':'hi'];image.loading='lazy';image.width=500;image.height=360;picture.append(image);
      }else{
        picture.classList.add('gallery-video-cover');const icon=document.createElement('span');icon.className='gallery-play';icon.textContent='▶';icon.setAttribute('aria-hidden','true');const text=document.createElement('span');text.textContent=en()?'Press to watch':'देखने के लिए दबाएँ';picture.append(icon,text);
      }
      const caption=document.createElement('span');caption.className='gallery-caption';const number=document.createElement('small');number.textContent=String(items.indexOf(item)+1).padStart(2,'0');const title=document.createElement('span');title.textContent=item[en()?'en':'hi'];caption.append(number,title);button.append(picture,caption);
      button.addEventListener('click',()=>{opener=button;current=page*pageSize+i;show();dialog.showModal();document.body.classList.add('gallery-is-open');});return button;
    }));
    document.getElementById('gallery-page').textContent=en()?`Page ${page+1} of ${pages} · ${list.length} items`:`पन्ना ${page+1} / ${pages} · ${list.length} झलकियाँ`;
    document.getElementById('gallery-prev').disabled=page===0;
    document.getElementById('gallery-next').disabled=page===pages-1;
    document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.galleryFilter===filter)));
  }
  function clearMedia(){const video=media.querySelector('video');if(video){video.pause();video.removeAttribute('src');video.load();}media.replaceChildren();}
  function show(){
    clearMedia();const list=selected(),item=list[current];
    document.getElementById('viewer-title').textContent=item[en()?'en':'hi'];
    document.getElementById('viewer-position').textContent=`${current+1} / ${list.length}`;
    if(item.type==='photo'){
      const image=document.createElement('img');image.src=item.src;image.alt=item[en()?'en':'hi'];media.append(image);
    }else{
      const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='metadata';video.src=item.src;video.setAttribute('aria-label',item[en()?'en':'hi']);media.append(video);
    }
    document.getElementById('viewer-prev').disabled=current===0;
    document.getElementById('viewer-next').disabled=current===list.length-1;
  }
  function step(delta){const next=current+delta;if(next<0||next>=selected().length)return;current=next;show();}
  function turn(delta){page+=delta;render();document.getElementById(delta>0?'gallery-next':'gallery-prev').focus({preventScroll:true});}
  document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.galleryFilter;page=0;render();}));
  document.getElementById('gallery-prev').addEventListener('click',()=>turn(-1));
  document.getElementById('gallery-next').addEventListener('click',()=>turn(1));
  document.getElementById('viewer-prev').addEventListener('click',()=>step(-1));
  document.getElementById('viewer-next').addEventListener('click',()=>step(1));
  document.getElementById('viewer-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{clearMedia();document.body.classList.remove('gallery-is-open');opener?.focus({preventScroll:true});});
  dialog.addEventListener('keydown',event=>{if(event.target.tagName==='VIDEO')return;if(event.key==='ArrowRight'){event.preventDefault();step(1);}if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}});
  media.addEventListener('touchstart',event=>{touchX=event.touches.length===1&&!media.querySelector('video')?event.touches[0].clientX:null;},{passive:true});
  media.addEventListener('touchend',event=>{if(touchX===null)return;const delta=event.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(delta)>60)step(delta<0?1:-1);},{passive:true});
  document.getElementById('language').addEventListener('click',()=>{render();if(dialog.open)show();});render();
})();
