import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../index.js'
import { Container, HStack, Heading, VStack,Image,Text, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from '../Loader/Loader.jsx'
import ErrorComponent from '../ErrorComponent/ErrorComponent.jsx';
import { Link } from 'react-router-dom';

const Coins = () => {

  const [coins,setCoins] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("inr");
  
  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }
  
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
        // console.log(data);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
    
  }, [currency,page])

  if(error){
    return (
      <ErrorComponent message={"error while fetching coins api"}/>
    )
  }
  
  return (
    <Container maxW={'container.xl'}>
      
      {
        loading ? <Loader/> : 
        <>
        
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value='inr'>INR</Radio>
              <Radio value='usd'>USD</Radio>
            </HStack>
          </RadioGroup>
          
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i)=>(
              <CoinCards key={i.id} id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} />
            ))}
          </HStack>
          
          <HStack>
            <Button 
              bgColor={'blackAlpha.900'}
              color={'white'}
              onClick={()=> changePage(2)}
            >
              2
            </Button>
          </HStack>
        </>
      }
      
    </Container>
  )
}


const CoinCards = ({id,name,img,price,symbol,currencySymbol="₹"}) =>(
  <Link to={`/coins/${id}`}>
    <VStack w={52} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={"all 0.3s"} m={'4'} 
      css={{
        "&:hover":{
          transform:"scale(1.1)",
        },
      }}
    >
        <Image src={img} objectFit={'contain'} w={10  } h={10} alt={'exchange'}></Image>
        
        <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
        
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price?`${currencySymbol}${price}`:"NA"}</Text>
    </VStack>
  </Link>
  
)





export default Coins
