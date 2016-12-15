#shoe
name
gender
model?
colorway
offerPrice
offerPriceUsed
stockPhoto[s]?
buyNow
newRelease
trending
lastSalePrice
category
tags

#photo
type
imageUrl
tags

#user
name
shoeSize
address


#want [many to many users]

#own [many to many users]

#purchased [many to many users]

#sold [ many to many users]


#listings [many to many users]
name
received
confirmed


#orders [many to many users]
shoeId
shipped
address

