// All the text fields for the form page 

import React from 'react';
import Form from 'react-bootstrap/Form';

const TextForm = ({ 
    validated, 
    errors, 
    isReadOnly, 
    formData, 
    setFormData 
}) => {
	return (
		<div className='formAlign'>
			<Form validated={validated}>
				<Form.Group className='mb-3' controlId='form.University'>
					<Form.Label>University</Form.Label>
					<Form.Control
						required
						readOnly={isReadOnly ? true : false}
						as='input'
						type='text'
						defaultValue={formData.uniName}
						onChange={(e) => {
							setFormData({...formData,uniName: e.target.value,});
							delete errors.uniRepName;
						}}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.uniName}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3' controlId='form.FullName'>
					<Form.Label>Full name</Form.Label>
					<Form.Control
						required
						readOnly={isReadOnly ? true : false}
						as='input'
						type='text'
						defaultValue={formData.uniRepName}
						onChange={(e) => {
                            setFormData({...formData,uniRepName: e.target.value,});
							delete errors.uniRepName;
						}}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.uniRepName}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3' controlId='form.JobTitle'>
					<Form.Label>Job title</Form.Label>
					<Form.Control
						required
						isValid={false}
						readOnly={isReadOnly ? true : false}
						as='input'
						type='text'
						defaultValue={formData.uniRepJobTitle}
						onChange={(e) => {
							setFormData({...formData,uniRepJobTitle: e.target.value,});
							delete errors.uniRepJobTitle;
						}}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.uniRepJobTitle}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3' controlId='form.EmailAddress'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						required
						readOnly={isReadOnly ? true : false}
						as='input'
						type='email'
						defaultValue={formData.uniRepEmail}
						onChange={(e) => {
							setFormData({...formData,uniRepEmail: e.target.value,});
							delete errors.uniRepEmail;
						}}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.uniRepEmail}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3' controlId='form.Region'>
					<Form.Label>Region</Form.Label>
					<Form.Control
						required
						disabled={isReadOnly ? true : false}
						as='select'
						defaultValue={formData.uniRegion}
						onChange={(e) =>
							setFormData({...formData,uniRegion: e.target.value,})
						}>
						<option hidden={formData.uniRegion !== '' ? true : false} selected='selected'></option>
						<option value='USA'>USA</option>
						<option value='CANADA'>Canada</option>
						<option value='EUROPE'>Europe</option>
						<option value='UNITED KINGDOM'>United Kingdom</option>
						<option value='OTHER'>Other</option>
					</Form.Control>
					<Form.Control.Feedback type='invalid'>
						{errors.uniRegion}
					</Form.Control.Feedback>
				</Form.Group>
			</Form>
		</div>
	);
};

export default TextForm;
