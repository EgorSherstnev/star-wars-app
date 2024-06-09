import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addViewedCharacter } from '../store/charactersSlice';
import { ICharacter } from '../models/ICharacter';
import { Button, Row, Col, Spin, Typography } from 'antd';
import { fetchCharacterDetail } from '../services/api';

const { Title } = Typography;

const CharacterDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const [character, setCharacter] = useState<ICharacter | null>(null);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (!id) {
               return;
            }

            const response = await fetchCharacterDetail(id);
            setCharacter(response);
            dispatch(addViewedCharacter(response));
         } catch (error) {
            console.error('Failed to fetch character details:', error);
            navigate('/404');
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id, navigate, dispatch]);

   if (loading || !character) {
      return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin />
         </div>
      );
   }

   return (
      <>
         <div className="character-detail" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Title level={1}>{character.name}</Title>
            <Row gutter={[16, 16]}>
               <Col span={12}><strong>Height:</strong></Col>
               <Col span={12}>{character.height}</Col>

               <Col span={12}><strong>Mass:</strong></Col>
               <Col span={12}>{character.mass}</Col>

               <Col span={12}><strong>Hair Color:</strong></Col>
               <Col span={12}>{character.hair_color}</Col>

               <Col span={12}><strong>Skin Color:</strong></Col>
               <Col span={12}>{character.skin_color}</Col>

               <Col span={12}><strong>Eye Color:</strong></Col>
               <Col span={12}>{character.eye_color}</Col>

               <Col span={12}><strong>Birth Year:</strong></Col>
               <Col span={12}>{character.birth_year}</Col>

               <Col span={12}><strong>Gender:</strong></Col>
               <Col span={12}>{character.gender}</Col>
            </Row>
            <Button onClick={() => navigate('/')} type="primary" style={{ marginTop: '20px' }}>
               Back to Home
            </Button>
         </div>
      </>
   );
};

export default CharacterDetail;