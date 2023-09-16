customTextEditor =
{
   initializeWidget : function(parentNode, widgetModel)
    {
     kony.print("###### widgetModel= "+widgetModel);
	 
	 var calTextArea='<div class="editor" ><hr/>'+
     '<textarea id="Texteditor"  placeholder="Enter text ..." style="width: 100%; height: 100% top:0% left:0%"></textarea></div>';
     parentNode.innerHTML = calTextArea;
	 
     CKEDITOR.replace( 'Texteditor',
     {
      autoGrow_onStartup : false,
      resize_enabled : false,
      //height : widgetModel.height
    });
	
	if(widgetModel.setTextValue!==null)
	{
		widgetModel.getTextValue=widgetModel.setTextValue; 
		CKEDITOR.instances.Texteditor.setData(widgetModel.setTextValue);
	}
	 CKEDITOR.instances.Texteditor.on('change', function(){
		 var  getTextData=CKEDITOR.instances.Texteditor.getData();
	    // getTextData=html2text(getTextData);
		customTextEditor.modelChange(widgetModel, "getTextValue", getTextData);
	 });
	function html2text(html) {
    var tag = document.createElement('div');
    tag.innerHTML = html;
    return tag.innerText;
    }
    },
    modelChange : function(widgetModel, propertyChanged, propertyValue)
    {
		kony.print(widgetModel.getTextValue);
		if ((propertyChanged==="getTextValue")&&(propertyValue !== widgetModel.getTextValue))
		{
			if(CKEDITOR.instances.Texteditor!==undefined)
			{
				
				widgetModel.getTextValue = propertyValue;			
		    }	
       }
	   if (propertyChanged==="setTextValue")
	   {
		   if(CKEDITOR.instances.Texteditor!==undefined)
		  CKEDITOR.instances.Texteditor.setData(propertyValue);
	   }
	}
	
	
}

