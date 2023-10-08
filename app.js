// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMStrings = {
    inputType : ".add__type",
    inputDescription : ".add__description",
    inputValue : ".add__value",
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

    getDOMStrings : function(){
      return DOMStrings;
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
  allItems : {
    inc : [],
    exp : []
  },

  totals : {
    inc : 0,
    exp : 0
  }
};

return {
  addItem : function(type, desc, val){
    var item, id;

    if(data.items[type].length === 0) id = 1;
    else{
      id = data.items[type][data.items[type].length - 1].id + 1;
    }

    if(type === 'inc'){
      item = new Income(id, desc, val);
    }else{
      item = new Expense(id, desc, val);
    }

    data.items[type].push(item);
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

        financeController.addItem(input.type, input.description, input.value);
        //3. олж авсан өгөгдөлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
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
  