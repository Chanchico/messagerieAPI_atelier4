# messagerieAPI_atelier4
Atelier 4

## Structure 
Message : 
```
{ 
  sender,
  customer,
  seller,
  content,  
  datetime 
}
```

## API ENDPOINT
GET chat(idCustomer, idSeller, dateMax) => [{message, message}]  
POST (idCustomer, idSeller, contenu)  
PUT (idMessage, newContenu)  
DELETE (idMessage)


