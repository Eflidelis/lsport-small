import React from 'react';

import TheHeader from '../components/TheHeader';
import InfoRow from '../components/InfoRow';
import TheOfferToFindSchool from '../components/TheOfferToFindSchool';
import ThePossibilities from '../components/ThePossibilities';
import TheRegionalStatistics from '../components/TheRegionalStatistics';
import TheOfferMobileApp from '../components/TheOfferMobileApp';
import TheApplication from '../components/TheApplication';
import TheProcess from '../components/TheProcess';
import TheFooter from '../components/TheFooter';

import TheExtraInfo from '../components/TheExtraInfo';
import ScrollButtons from '../components/ScrollButtons';

import './Index.scss';

const Index = () => {
  const submitApplication = async (applicationData) => {
    try {
      const payload = {
        name: applicationData.name,
        phone: applicationData.phone,
        email: applicationData.email,
        company: applicationData.company,
        inn: applicationData.inn,
        comment: applicationData.notes,
      };

      const response = await fetch('https://tg-form.lsport.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки заявки');
      }

      console.log('Заявка успешно отправлена');
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      throw error; // важно: пусть TheApplication сам решает, что показывать
    }
  };

  return (
    <div>
      <TheHeader />
      <InfoRow />

      <div className="container">
        <h1 className="partners-title">Наши партнёры</h1>
      </div>

      <TheOfferToFindSchool />

      <div id="possibilities" className="container possibilities">
        <h1>Возможности онлайн-платформы</h1>
        <ThePossibilities />
      </div>

      <div id="statistics" className="container regional-statistics">
        <TheRegionalStatistics />
      </div>

      <h1 className="mobile-title container">Мобильное приложение</h1>

      <div id="offer-mobile-app" className="container offer-mobile-app">
        <TheOfferMobileApp />
      </div>

      <div id="application" className="container application">
        <TheApplication submitApplication={submitApplication} />
      </div>

      <h1 className="process-title-main container">Что будет дальше?</h1>

      <TheProcess />

      <div id="extra-info">
        <TheExtraInfo />
      </div>

      <ScrollButtons />
      <TheFooter />
    </div>
  );
};

export default Index;
