import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

	const onClickGreek = () => {
		i18n.changeLanguage("gr");
	};

	const onClickEnglish = () => {
		i18n.changeLanguage("en");
  };
  
  return (
		<div>
			<img
				className="me-3"
				title="Ελληνικά"
				src="https://flagcdn.com/h20/gr.png"
				srcSet="https://flagcdn.com/h40/gr.png 2x"
				heigh="20"
				alt="Greek flag"
				onClick={onClickGreek}
			></img>
			<img
				title="English"
				src="https://flagcdn.com/h20/gb.png"
				srcSet="https://flagcdn.com/h40/gb.png 2x"
				width="40"
				alt="English flag"
				onClick={onClickEnglish} 
			></img>
		</div>
	);
}

export default LanguageSelector
