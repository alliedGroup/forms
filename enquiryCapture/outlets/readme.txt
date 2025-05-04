[ This File Will Help You To Setup This Form And Link With Google Sheet ]
/////////////////////////////////////////////////////////////////////////

Step 1 - Create A Google Sheet with any name you want .

Step 2 - Create Tab/sheet in that spreadsheet 
     a.  - For Reciving The From Data ( Any Name You Want ) for now we will use enquiryResponse.
     b.  - For Configuration so you dont have to edit HTML File Again and Again ( configuration ) 

Step 3 - In the enquiryResponse sheet create heading for reciving data with the below names.
            Time Stamp	
            EQ ID
            Enquiry Capture By	
            Enquiry Allocated To	
            Customer Name	
            Phone Number	
            Alternative Number	
            Occupation	
            Address	
            Zip Code	
            District	
            Purchase Type	
            Enquiry Status	
            Enquiry Source	
            Enquiry Type	
            Field Location	
            Model Name	
            Remarks	Test Ride	
            1st Follow Up Date

            info: If You Wish To Change The Names You Have to change the same name for ( html input Name attribute ) else data will not recive, also for adding the new option
            you have to do the same you have give same heading name to the HTML input Name attribute .

Step 4 -  In the ( Setup ) Folder You find a appScript.js file in that file change the sheetName with you own sheet name where you want to recive the form data
          in my case it is ( enquiryResponse ) which we have created before then copy and paste it into your appScript file in that spreadsheet.

Step 5 -  After Copy Paste the code into your appScript deploy it as anyone and copy the deploy URL and in the index.html file find the appScript URL
          at bottom of the code in [ Submit Form Section ] and replace it with your own URL.

Setp 6 -  Now Setup the configuration sheet with your data as you want and modify according to you then publish the configuration sheet as CSV file and copy the url and use in 
          script.js file in the sheetUrl for fetching the data. 











/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright
This Form is created By RAHUL.
insta - @owlbunt
fb - @owlbunt
wa - 9395913186
telegram - @owlbunt
( For Any Help Feel Free To Contact )
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////