function correctHour(t){return(t+=1)>23?0:t}function dd(t){return t<10?"0"+t:""+t}function stepBackDate(t,e,i){return--i<1&&(--e<1?(t--,e=12,i=31):i=daysInMonth(e)),t+"-"+dd(e)+"-"+dd(i)+" 04:00"}function isLeapYear(t){return t%100==0?t%400==0:t%4==0}function daysInMonth(t,e){switch(e){case 11:case 9:case 6:case 4:return 30;case 2:return isLeapYear(t)?29:28;default:return 31}}function DATE(t){var e="none";try{this.year=t.getFullYear(),e="date"}catch(i){try{this.year=t.field("Date").getFullYear(),e="entry"}catch(t){e="string"}}if("string"==e){var i=t.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);null!=i&&(this.year=parseFloat(i[1]),this.month=parseFloat(i[2]),this.day=parseFloat(i[3]),this.hour=parseFloat(i[4]),this.minute=parseFloat(i[5]))}else"entry"==e?(this.month=t.field("Date").getMonth()+1,this.day=t.field("Date").getDate(),this.hour=correctHour(t.field("Time").getHours()),this.minute=t.field("Time").getMinutes()):(this.month=t.getMonth()+1,this.day=t.getDate(),this.hour=t.getHours(),this.minute=t.getMinutes());this.dateStamp=this.year+"-"+dd(this.month)+"-"+dd(this.day)+" "+dd(this.hour)+":"+dd(this.minute),this.hour<4?this.dayStart=stepBackDate(this.year,this.month,this.day):this.dayStart=this.year+"-"+dd(this.month)+"-"+dd(this.day)+" 04:00",this.date=this.year+"-"+dd(this.month)+"-"+dd(this.day)+" ",this.time=dd(this.hour)+":"+dd(this.minute)}
