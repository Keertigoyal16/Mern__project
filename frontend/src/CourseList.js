import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  const loadRazorpay = async (course) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    // Create order from backend
    const orderRes = await axios.post('http://localhost:5000/api/checkout', {
      amount: course.price * 100, // in paise
      courseTitle: course.title
    });

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // replace with your Razorpay key
      amount: orderRes.data.amount,
      currency: 'INR',
      name: 'Digital Course Purchase App',
      description: `Buy ${course.title}`,
      order_id: orderRes.data.id,
      handler: function (response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Your Name',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.title} - ₹{course.price}
            <button onClick={() => loadRazorpay(course)} style={{ marginLeft: '10px' }}>
              Buy Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
