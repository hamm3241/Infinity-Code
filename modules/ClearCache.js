var clearCache = function(){
	var LocalStoredKeys = ['adminConsole','mobileFabricServiceDoc'];
	if (kony && kony.store) {
		for (var i = 0; i < LocalStoredKeys.length; i++) {
          try{
            kony.store.removeItem(LocalStoredKeys[i]);
          }catch(e){
            kony.print("Key doesn't exist in kony store");
          }
			
		}
	}
}