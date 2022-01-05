import React, { useState, useEffect } from "react";
import { activate } from "../api/apiCalls";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const AccountActivationPage = (props) => {
  const [result, setResult] = useState();

	useEffect(() => {
		const activateRequest = async () => {			
			setResult('');
			try {
				await activate(props.match?.params.token)
				setResult("success");
			} catch (err) {
				setResult("fail");	 			
			} 
		}
		activateRequest() 
	}, [props.match?.params.token]); 

	let content = (
		<Alert type="secondary" center>
			<Spinner size='big' />
		</Alert>
	)
	if (result === "success") {
		content = <Alert>Account is activated</Alert>;
	} else if (result === "fail") {		
		content = <Alert type="danger">Activation failure</Alert>;
	}

	return (
		<div data-testid="activation-page"> 
			{content}
		</div>
	);
};

export default AccountActivationPage; 
