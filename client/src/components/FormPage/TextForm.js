import React from 'react'
import Form from 'react-bootstrap/Form'

const TextForm = ({formData, setFormData}) => {
    return (
        <div className="formAlign">
            <Form>
                <Form.Group className="mb-3" controlId="form.University">
                    <Form.Label>University</Form.Label>
                    <Form.Control as="input" type="text" defaultValue={formData.uniName} onChange={(e)=> setFormData({...formData, uniName:e.target.value})}/>
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="form.FullName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control as="input" type="text" defaultValue={formData.uniRepName} onChange={(e)=> setFormData({...formData,uniRepName:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="form.JobTitle">
                    <Form.Label>Job title</Form.Label>
                    <Form.Control as="input" type="text" defaultValue={formData.uniRepJobTitle} onChange={(e)=> setFormData({...formData,uniRepJobTitle:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="form.EmailAddress">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control as="input" type="email" defaultValue={formData.uniRepEmail} onChange={(e)=> setFormData({...formData,uniRepEmail:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="form.Region" >
                    <Form.Label>Region</Form.Label>      
                    <Form.Control as="select" defaultValue={formData.uniRegion} onChange={(e)=> setFormData({...formData,uniRegion:e.target.value})}>
                        <option value="USA">USA</option>
                        <option value="CANADA">Canada</option>
                        <option value="EUROPE">Europe</option>
                        <option value="UNITED KINGDOM">United Kingdom</option>
                        <option value="OTHER">Other</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}

export default TextForm
