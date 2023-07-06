import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../index.js'
import { Container, HStack, Heading, VStack,Image,Text } from '@chakra-ui/react';
import Loader from '../Loader/Loader.jsx'
import ErrorComponent from '../ErrorComponent/ErrorComponent.jsx';

const Exchanges = () => {

  const [exchanges,setExchanges] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
    
  }, [])

  if(error){
    return (
      <ErrorComponent message={"error while fetching api"}/>
    )
  }
  
  return (
    <Container maxW={'container.xl'}>
      
      {
        loading ? <Loader/> : 
        <>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {exchanges.map((i)=>(
              <ExchangeCards key={i.id} name={i.name} img={i.image} url={i.url} rank={i.trust_score_rank} />
            ))}
          </HStack>
        </>
      }
      
    </Container>
  )
}


const ExchangeCards = ({name,img,url,rank}) =>(
  <a href={url} target={"blank"}>
    <VStack w={52} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={"all 0.3s"} m={'4'} 
      css={{
        "&:hover":{
          transform:"scale(1.1)",
        },
      }}
    >
        <Image src={img} objectFit={'contain'} w={10  } h={10} alt={'exchange'}></Image>
        
        <Heading size={'md'} noOfLines={1}>{rank}</Heading>
        
        <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
  
)



export default Exchanges