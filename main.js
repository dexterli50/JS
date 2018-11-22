const TypeWriter=function(txtElement, words, wait=3000){
	//Конструктордун жардамында обьект түздүк
	//txtElement бул текстовый элементтер менен иштөөчү метод
    this.txtElement = txtElement;
    this.words = words; // Массив катары берилген сөздөр
    this.wait = wait;   // Сөздөрдүн толук чыгып бүткөнгө чейинки убактысы
    this.wordIndex = 0; // WordIndex бул биздин массивте берилген сөздөрдү браузерге чыгарганга шарт түзөт
    this.txt = ''; // сөздөрдү бөлүп чыгаруу үчүн
    this.isDeletin = false; // Cөздөрдү биз байкап жатканда өчүп кетүүсүн же пайда болуусу үчүн
    this.type();
};

TypeWriter.prototype.type = function(){
	let speed = 500;
	
      currentIndex=this.wordIndex%this.words.length; 
      //currentIndex учурдагы индексти алабыз % массивтеги сөздүн узундугу канчалык узун болсо кайталанып жазылып турат
      currentWord=this.words[currentIndex]; // бул методдун жардамы менен бизге чыга турган сөзду алабыз

      if(this.isDeletin){
      	speed=speed/2; //Эгер сөздөр өчүп кеткен учурда ылдамдыкты экиге бөлөбүз
      	this.txt=currentWord.substring(0, this.txt.length -1);
      	// учурда жазылып жаткан сөздү 1 ден кемитип азайтуу үчүн
      }else{
      	speed = 500; // Сөз өчпөсө ылдамдыгы 500 m/s
      	this.txt=currentWord.substring(0, this.txt.length +1)
      	// Учурда жазылып жаткан сөздү 1 ден кошуу үчүн
      }

      this.txtElement.innerHTML=this.txt;
      //бул жерде текшерүүчү цикл койобуз. Пайда болуп турган сөз 3 секунда
      //күтүп турат анан кайрадан өчүп кийинки текст пайда болот

      if(!this.isDeletin&&this.txt === currentWord){
      	this.isDeletin=true;
      	speed=this.wait;
      }else if (this.isDeletin && this.txt === ''){
      	this.wordIndex++;
      	this.isDeletin=false;
      }
    setTimeout(()=>this.type(),speed)
};

document.addEventListener('DOMContentLoaded',init);
//addEventlistene кошо турган обработчик демек
//DOMContentLoaded браузерди баарын загрузка кылып жана init функциясын чакырат
function init(){
	let txtElement = document.querySelector('.text'),
	words = JSON.parse(txtElement.getAttribute('data-words')),
	//JSON.parse массив менен берилген сөздөрүбүздү терип чыгаруу үчүн колодонулат
    wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
} 

 