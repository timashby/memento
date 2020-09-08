message("Analysis started");var endLogged,logFile=file("/storage/emulated/0/memento/Analysis log.txt"),strLog="",arEntries=lib().entries(),score={},diff={num:0,date:""},MAPos=["Contentment","Tranquility","Enthusiasm","Mental clarity","Processing speed","Focus","Energy","Motivation"],MANeg=["Fatigue","Sleepiness","Torso, leaden","Arms, leaden","Legs, leaden"],CAANeg=["Fatigue","Sleepiness","Anxiety","Depression","Irritation\t","Confrontational","Paranoia","Clumsiness","Torso, leaden","Arms, leaden","Legs, leaden"],arExercises=[{n:"glutes 1",i:3},{n:"glutes 2",i:5},{n:"squat",i:30},{n:"press up",i:30}];function overviewAnalysis(){for(var e,t=0;t<arEntries.length;t++)e=arEntries[t],score={ma:0,caa:0,ovd:0},strLog+="\n\n"+e.field("Day start")+"\nscore: "+JSON.stringify(score),message(t+" of "+arEntries.length);logFile.write(strLog),logFile.close()}function updateScoreSleepCAACycle(e){var t=getEndLogged(e);if(null!=t){endLogged=parseInt(parseFloat(t.h))<10?"0"+t.h:t.h,endLogged+=":"+parseInt(parseFloat(t.m))<10?"0"+t.m:t.m;var r=getEndSC(e);if(null!=r){if(eDiff=getDiff(t,r),null==eDiff)return null;score.ma+=(3-eDiff)/3}return null}return null}function getEndLogged(e){var t,r,n=[];return e.field("Sleep - night").split("\n").map(e=>"string"!=typeof e?null:null==(r=e.match(/Sleep @ (\d+):(\d+), (\d+)(.\d+).*/))?null:(r[1]=parseInt(parseFloat(r[1]))+parseInt(parseFloat(r[3])),r[1]>24&&(r[1]-=24),r[2]=Math.round(parseFloat(r[2])+60*parseFloat(r[4])),r[2]>60&&(r[2]-=60,r[1]+=1),t={h:r[1],m:r[2]},void n.push(t))),n.length>0?(t={h:0,m:0},n.map(e=>{e.h<12&&e.h>t.h&&(t=e)}),t):null}function getEndSC(e){var t=e.field("Sleep Cycle data");return null!=(t=t.match(/.* to (\d+):(\d+)/))?{h:parseInt(parseFloat(t[1])),m:parseInt(parseFloat(t[2]))}:null}function getDiff(e,t){e.m-=t.m,e.m<0&&(e.m+=60,e.h-=1);var r=parseFloat((e.h-t.h+e.m/60).toFixed(2));return r>=0?r:null}function getSymValMA(e,t){for(var r=e.field("Symptoms - current").split("\n"),n=0;n<r.length;n++){var a=r[n].match(new RegExp(".*"+t+".*?(\\[.*\\])"));if(null!=a){if(1==(a=JSON.parse(a[1])).length){var s=parseInt(parseFloat(a[0][1]));return s}for(var i=null,l=0;l<a.length;l++){if(a[l]>endLogged||a[l]<"04:00")return s=null==i?parseInt(parseFloat(a[l][1])):parseInt(parseFloat(i));i=a[l][1]}}}return 0}function updateOverviewMA(e){for(var t=e.field("Average overview breakdown").split("\n"),r=0;r<t.length;r++)if(t[r]>endLogged){var n=t[r].match(/\d+:\d+ - (\d+)/)[1];return score.ma+=n/8,n}return null}function updateScoreMA(e){MAPos.map(t=>{score.ma+=getSymValMA(e,t)/5}),MANeg.map(t=>{score.ma+=(5-getSymValMA(e,t))/5})}function updateScoreFirstIntake(e){for(var t,r,n=e.field("Intake - combined").split("\n\n"),a="",s=0;s<n.length;s++)if((t=n[s].split("\n")).length>4){a=t[0].trim();break}r=(a=""==a?"08:45":a)>"11:00"?0:a>"10:00"?.4:a>"08:45"?.75:a>"06:30"?1:0,score.ma+=r}function updateScoreExerciseMA(e){for(var t,r,n=e.field("Exercise breakdown").split("\n\n"),a=0;a<n.length;a++)if(exLines=n[a].split("\n"),null!=(t=exLines[0].match(/(\d+:\d+).*/))&&t[1]<"10:00")for(var s=0;s<arExercises.length;s++)null!=(r=n[a].match(new RegExp("^(\\d+)\\s+"+arExercises[s].n)))&&(score.ma+=r[1]/arExercises[s].i)}function timeStringToObject(e){return null!=(e=e.match(/(\d+):(\d+)/))?{h:parseFloat(e[1]),m:parseFloat(e[2])}:null}function getSpan(e,t){strLog+="\ngetSpan: t0: "+e+", t1: "+t,e=timeStringToObject(e),t=timeStringToObject(t),strLog+="\ngetSpan: t0: "+JSON.stringify(e)+"\nt1: "+JSON.stringify(t);var r={h:0,m:t.m-e.m};return r.m<0&&(r.m+=60,r.h-=1),r.h+=t.h-e.h,r.h<0&&(r.h+=24),strLog+="\ngetSpan 1: r: "+JSON.stringify(r),r=parseFloat((r.h+r.m/60).toFixed(2)),strLog+="\ngetSpan 2: r "+r,r}function getSymValCAA(e,t){for(var r=e.field("Symptoms - current").split("\n"),n=0;n<r.length;n++){var a=r[n].match(new RegExp(".*"+t+".*?(\\[.*\\])"));if(null!=a){if(1==(a=JSON.parse(a[1])).length)return parseInt(parseFloat(a[0][1]));for(var s="04:00",i=0,l=0;l<a.length;l++)i+=getSpan(s,a[l][0])*parseInt(parseFloat(a[l][1])),s=a[l][0];return(i+=getSpan(s,"03:59")*parseInt(parseFloat(a[a.length-1][1])))/24}}return 0}function updateScoreCAA(e,t,r){t.map(t=>{score.caa+=getSymValCAA(e,t)/5}),r.map(t=>{score.caa+=(5-getSymValCAA(e,t))/5})}function updateScoreSleepCAA(e){var t=e.field("Sleep - total day");t>6&&(t=6),score.caa+=(6-t)/6}function updateScoreExerciseCAA(e){for(var t,r=e.field("Exercise breakdown").split("\n\n"),n=0;n<r.length;n++)if(exLines=r[n].split("\n"),null!=exLines[0].match(/(\d+:\d+).*/))for(var a=0;a<arExercises.length;a++)null!=(t=r[n].match(new RegExp("^(\\d+)\\s+"+arExercises[a].n)))&&(score.caa+=t[1]/arExercises[a].i)}function updateOverviewDuration(e){var t=e.field("Average overview breakdown").split("\n");if(strLog+="\nupdateOverviewDuration: ov:\n"+JSON.stringify(t),t.length>0){var r,n,a=new RegExp("(\\d+:\\d+) - (\\d+)");if(1==t.length)r=parseFloat((parseFloat(t[0].match(a)[2])/8).toFixed(2)),isNaN(r)?strLog+="\nupdateOverviewDuration: non-numeric overview":(strLog+="\nupdateOverviewDuration: r: "+r,score.ovd=r);else{for(var s="04:00",i=0,l=0;l<t.length;l++)strLog+="\nupdateOverviewDuration: ov[c1]: "+t[l],n=t[l].match(a),strLog+="\nupdateOverviewDuration: l: "+n,i+=getSpan(s,n[1])*parseFloat(n[2]),s=n[1];i+=getSpan(s,"03:59")*parseInt(parseFloat(t[t.length-1].match(a)[2])),strLog+="\nupdateOverviewDuration:\nr: "+(r=i/24),score.ovd=r}}}try{main()}catch(t){var e=new Error("Rethrowing the "+t.message+" error");throw strLog+="\n\n"+JSON.stringify(t),logFile.write(strLog),logFile.close(),e}message("Analysis updated 2020-09-03 12:24");
