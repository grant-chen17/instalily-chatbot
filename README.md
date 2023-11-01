To pull the source code run ```git fetch github.com/grant-chen17/instalily-chatbot/```  
To run this project locally you will need to obtain an OpenAI API key.  
Once you have obtained one go to the ```src``` folder and create a file called ```.env```  
Create the environment variable like so:  
```REACT_APP_OPENAI_API_KEY = YOUR-API-KEY-HERE```   
To install as a Chrome extension go to the root directory and run 
```$ npm-run-build```
This will generate a directory called ```dist/```  
Go to Google Chrome Extensions-->Manage Extensions-->Developer mode.  
Find "Load unpacked" and load ```dist/``