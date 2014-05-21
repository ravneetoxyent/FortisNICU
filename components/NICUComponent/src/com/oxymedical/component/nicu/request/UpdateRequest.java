package com.oxymedical.component.nicu.request;

public class UpdateRequest extends Thread {

	@Override
	public void run() 
	{
		while(true)
		{
			try 
			{
				Thread.sleep(30);
				System.out.println("Inside Update Request Thread of NICU Component");
			} 
			catch (InterruptedException e) 
			{
				e.printStackTrace();
			}
			
		}
		
	}

}
