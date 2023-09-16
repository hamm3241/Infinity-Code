package com.kony.base;

import org.testng.annotations.Test;

import com.kony.ktas.KeywordDriven.Library.KeywordDriverScript;
// 
public class BaseClass extends KeywordDriverScript {

	@Test
	public static void entryBlock()  {
			
		/*TestListenerAdapter tla = new TestListenerAdapter();
		TestNG testng = new TestNG();

		testng.setOutputDirectory("./Reports/TestNGResults");
		List<String> suitesList = new ArrayList<String>();
		suitesList.add("./XMLFiles/TestNg.xml");
		testng.setTestSuites(suitesList);
		testng.addListener(tla);
		testng.run();*/
		
		System.out.println("This is Dummy TestNG file");
		
		
		
		
		
	}
	
}
