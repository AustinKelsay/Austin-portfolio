import React, {useEffect, useState} from 'react';
import {
  Button, Popover, PopoverHeader
} from 'reactstrap';
import {useSpring, animated} from "react-spring";
import './components.css';

const Contact = () => {
  const [isToggled, setToggled] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [emailInfo, SetEmailInfo] = useState({
    feedback: '', 
    name: '', 
    replyTo: '',
    email: 'austinkelsay@protonmail.com'
})

const toggle = () => setPopoverOpen(!popoverOpen);

const handleChange = (e) => {
    SetEmailInfo({...emailInfo, [e.target.name]: e.target.value})
}

const sendFeedback = (serviceId, templateId, variables) => {
    window.emailjs.send(
        serviceId, templateId,
        variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    
    const handleSubmit = (e) => {
        const serviceId = 'service_qa5j5ac'
        const templateId = 'template_egc562i';
        sendFeedback(serviceId, templateId, {message_html: emailInfo.feedback, from_name: emailInfo.name, reply_to: emailInfo.replyTo})
      }

    useEffect(() => {
        setToggled(!isToggled);
    },[])

  const fade = useSpring({
    config: {
      duration: 3000
    },
    opacity: isToggled ? 1 : 0
  });

    return(
        <animated.div style={fade} className='contact'>
          <form className="test-mailing">
            <h1>Lets get in touch</h1>
            <div>
                <textarea
                    id="test-mailing"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter your name here"
                    required
                    value={emailInfo.name}
                    style={{width: '60%', height: 'auto'}}
                />
                <textarea
                    id="test-mailing"
                    name="replyTo"
                    onChange={handleChange}
                    placeholder="Enter your email here"
                    required
                    value={emailInfo.replyTo}
                    style={{width: '60%', height: 'auto'}}
                />
                <textarea
                    id="test-mailing"
                    name="feedback"
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    value={emailInfo.feedback}
                    style={{width: '100%', height: '120px'}}
                />
            </div>
            <Button id="Popover1" onClick={handleSubmit} outline color="warning">
                Send
            </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
              <PopoverHeader>Email sent!</PopoverHeader>
            </Popover>
  	    </form>
        </animated.div>
    )
}

export default Contact;