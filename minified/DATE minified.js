function correctHour(t){return(t+=1)>23?0:t}function dd(t){return t<10?"0"+t:""+t}function stepBackDate(t,e,i){return--i<1&&(--e<1?(t--,e=12,i=31):i=daysInMonth(t,e)),t+"-"+dd(e)+"-"+dd(i)+" 04:00"}function dateSubtract(t,e){for(;e>0;)e>=t.day?(e-=t.day,t.month--,t.month<1&&(t.month=12,t.year--),t.day=daysInMonth(t.year,t.month)):(t.day-=e,e=0);return t.updateProperties(),t}function isLeapYear(t){return t%100==0?t%400==0:t%4==0}function daysInMonth(t,e){switch(e){case 11:case 9:case 6:case 4:return 30;case 2:return isLeapYear(t)?29:28;default:return 31}}function DATE(t){if("string"==typeof t){var e=t.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);if(null==e&&(e=t.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)),null==e)throw log("DATE error. "+JSON.stringify(t)+" is not a valid date string."),"DATE error. Input is not a valid date string.";this.year=parseFloat(e[1]),this.month=parseFloat(e[2]),this.day=parseFloat(e[3]),this.hour=parseFloat(e[4]),this.minute=parseFloat(e[5])}else if("function"==typeof t.field)this.year=t.field("Date").getFullYear(),this.month=t.field("Date").getMonth()+1,this.day=t.field("Date").getDate(),this.hour=correctHour(t.field("Time").getHours()),this.minute=t.field("Time").getMinutes();else{if("function"!=typeof t.getFullYear)throw log("DATE error. "+JSON.stringify(t)+" is not a valid input."),"DATE error. Input is not valid.";this.year=t.getFullYear(),this.month=t.getMonth()+1,this.day=t.getDate(),this.hour=correctHour(t.getHours()),this.minute=t.getMinutes()}this.updateProperties=function(){this.dateStamp=this.year+"-"+dd(this.month)+"-"+dd(this.day)+" "+dd(this.hour)+":"+dd(this.minute),this.hour<4?this.dayStart=stepBackDate(this.year,this.month,this.day):this.dayStart=this.year+"-"+dd(this.month)+"-"+dd(this.day)+" 04:00",this.date=this.year+"-"+dd(this.month)+"-"+dd(this.day)+" ",this.time=dd(this.hour)+":"+dd(this.minute)},this.updateProperties()}ac,log("DATE updated 2020-07-20 20:45");
