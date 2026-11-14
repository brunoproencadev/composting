export default async function verifyScenes() {
  const assert=(ok,message)=>{if(!ok)throw Error(message);};
  const wait=()=>new Promise(r=>setTimeout(r,900));
  const go=async y=>{scrollTo({top:y,behavior:"instant"});await wait();};
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pinExpected=!reduced&&innerWidth>=1024&&innerHeight>=800&&matchMedia("(pointer: fine)").matches;
  assert(document.querySelectorAll(".pin-spacer").length===(pinExpected?2:0),"Expected exactly two eligible pins or none");
  if(pinExpected){
    const stage=document.querySelector(".cycle-stage"),spacer=stage.parentElement;
    const start=spacer.getBoundingClientRect().top+scrollY-110;
    await go(start+200);const top=stage.getBoundingClientRect().top,art=getComputedStyle(document.querySelector(".garden-sprout")).transform;
    await go(start+1300);
    assert(Math.abs(stage.getBoundingClientRect().top-top)<2,"Cycle must remain pinned");
    assert(getComputedStyle(document.querySelector(".garden-sprout")).transform!==art,"Internal scene must change while pinned");
    await go(start+200);assert(Math.abs(stage.getBoundingClientRect().top-top)<2,"Pin must reverse correctly");
    const impact=document.querySelector(".impact-stage"),impactStart=impact.parentElement.getBoundingClientRect().top+scrollY-110;
    await go(impactStart+100);const impactTop=impact.getBoundingClientRect().top;
    await go(impactStart+400);assert(Math.abs(impact.getBoundingClientRect().top-impactTop)<2,"Impact must remain pinned");
  }
  document.querySelector("#comece").scrollIntoView({behavior:"instant"});await wait();
  const boxes=[...document.querySelectorAll(".kit-card input")];
  for(const box of boxes)if(!box.checked)box.click();await wait();
  assert(document.querySelector(".kit-growth").dataset.progress==="3","Checklist must grow plant");
  assert(getComputedStyle(document.querySelector(".plant-leaves")).opacity==="1","Leaves must be visible after completing checklist");
  for(const box of boxes)box.click();await wait();
  assert(document.querySelector(".kit-growth").dataset.progress==="0","Unchecking must restore soil stage");
  const field=document.querySelector(".kit-playground .sticker-field"),sticker=field.querySelector(".play-sticker");
  const home=sticker.style.left;
  sticker.click();await wait();const bounds=field.getBoundingClientRect();
  field.dispatchEvent(new MouseEvent("click",{bubbles:true,clientX:bounds.left+bounds.width*.4,clientY:bounds.top+bounds.height*.4}));await wait();
  assert(sticker.style.left!==home,"Select-and-place alternative must move sticker without dragging");
  sticker.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));await wait();
  assert(sticker.style.left===home,"Escape must reset sticker");
  assert(document.documentElement.scrollWidth<=document.documentElement.clientWidth,"No horizontal overflow");
  await go(0);
  return {pinExpected,plantStages:true,clickPlacement:true,keyboardReset:true,width:innerWidth,reduced};
}
