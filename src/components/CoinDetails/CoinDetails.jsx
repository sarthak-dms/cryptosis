import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../index.js'
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { Chart } from '../Chart/Chart';

const CoinDetails = () => {
  const [coin,setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");
  let currencySymbol = (currency=="inr")?"₹":"$";
  
  const params = useParams();
  
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
    
  }, [params.id])
  
  if(error){
    return (
      <ErrorComponent message={"error while fetching coin api"}/>
    )
  }
  
  
  return (
    <Container maxW={'container.xl'}>
      
      {
        loading?<Loader/>:(
          <>
            <Box w={'full'} borderWidth={1}>  
              {/* <Chart/> */}
            </Box>
            
            <RadioGroup value={currency} onChange={setCurrency} p={8}>
              <HStack spacing={4}>
                <Radio value='inr'>INR</Radio>
                <Radio value='usd'>USD</Radio>
              </HStack>
            </RadioGroup>
            
            <VStack spacing={4} padding={'20'} alignItems={'flex-start'}>
              
              <Text alignSelf={'center'} opacity={0.7} fontSize={'small'}>
                Last updated on {(coin.market_data.last_updated).split('G')[0]}
              </Text>
              
              <Image src={coin.image.large} w={16} h={16} objectFit={'contain'}/>
              
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_1h_in_currency>0?"increase":"decrease"}/>
                  {coin.market_data.price_change_percentage_1h_in_currency[currency]}%
                </StatHelpText>
              </Stat>
              
              <Badge fontSize={'2xl'} bg={'blackAlpha.800'} color={'white'}>{`#${coin.market_cap_rank}`}</Badge>
              
              <CustomBar low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}/>
              
              <Box>
                <Item title={"Max Supply"} value={coin.market_data.max_value} />
                <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>
              
              
            </VStack>
          </>
        )
      }
      
    </Container>
  )
}


const CustomBar = ({low,high}) =>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme='teal' width={'full'}/>
    <HStack justifyContent={'space-between'} width={'full'}>
      <Badge children={low} colorScheme='red' />
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
)


const Item = ({title,value}) =>(
  <HStack justifyContent={'space-between'} w={'full'} my={4}>
    <Text letterSpacing={'widest'} fontFamily={'Bebas Neue'}>{title}</Text>
    <Text>{value}</Text>
    
  </HStack>
)


export default CoinDetails