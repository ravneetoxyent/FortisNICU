package com.oxymedical.component.nicu.request;

public class UpdateRequest extends Thread {

	@Override
	public void run() 
	{
		while(true)
		{
			try 
			{
				Thread.sleep(36000);
			} 
			catch (InterruptedException e) 
			{
				e.printStackTrace();
			}
			
		}
		
	}

}
