// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {//private function
  var DOMStrings = {
    inputType : ".add__type", // inc or exp
    inputDescription : ".add__description", //desc
    inputValue : ".add__value", // value
    addBtn : ".add__btn"
  };
  return{//public service
    getInput:function(){
      return{
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value:document.querySelector(DOMStrings.inputValue).value
      };
    },
//public service
    getDOMStrings : function(){
      return DOMStrings;
    },
    addListItem : function(item,type){
      //орлого зарлага агуулсан html бэлтгэнэ.
      var html, list;
      
      if(type === 'inc'){
        list = '.income__list';
        html ='<div class="item clearfix" id="$id$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$VALUE$</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }else{
        list = '.expenses__list';
        html ='<div class="item clearfix" id="$id$"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete">   <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //тэр хтмл дотроо зарлагын утгуудыг REPLACE хийж өгнө.

      html = html.replace('$id$', item.id);
      html = html.replace('$$DESCRIPTION$$', item.description);
      html = html.replace('$VALUE$', item.value);
      //Бэлтсэгэн html ээ DOM руу хийж өгнө.

      document.querySelector(list).insertAdjacentHTML('beforeend', html);
    }
  };

})();

// Санхүү тэй ажиллах контроллер
var financeController = (function() {
  // private data
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }
//private data
  var Expense = function(id , description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var i1 = new Income(1 , 'Цалин', 2500000);
  var i2 = new Income(2 , 'Зээл авсан', 1500000);
//private data
var data = {
  items : {
    inc : [],
    exp : []
  },

  totals : {
    inc : 0,
    exp : 0
  }
};

return { //data ruu nemj ugnu
  addItem : function(type, desc, val){
    var item, id;

    if(data.items[type].length === 0) id = 1;
    else{
      id = data.items[type][data.items[type].length - 1].id + 1;
      //length - 1 gedeg n niit element too -1 ni [type][0] hamgiin ehni element iig avna 
    }

    if(type === 'inc'){
      item = new Income(id, desc, val);
    }else{
      item = new Expense(id, desc, val);
    }

    data.items[type].push(item);

    return item;
  },

  seeData : function(){
    return data;
  }
};

})();

// Программын холбогч контроллер
var appController = (function(uiController, financeController) {

 

  var ctrlAddItem = function(){
        //1.оруулах өгөгдөлийг дэлгэцээс олж авна.
        var input = uiController.getInput();
        //2. олж авсан санхүүгийн контроллерт дамжуулж авна.
        var item = financeController.addItem(input.type, input.description, input.value);
        //3. олж авсан өгөгдөлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        uiController.addListItem(item, input.type);
        //4. төсвийг тооцоолно.
        //5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };

var setupEventListeners = function(){

  var DOM = uiController.getDOMStrings();

  document.querySelector(DOM.addBtn).addEventListener("click",function(){
    ctrlAddItem();
  });

  document.addEventListener("keypress",function(event){
   if(event.keyCode === 13 || event.which === 13){
    ctrlAddItem();
   }
  });
};

  return {
    init : function(){
      console.log('Application started...');
      setupEventListeners();
    }
  }
})(uiController, financeController);

appController.init();
  