import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return(
        <div className="User-form">
            <Form>
                <Field type="text" name="name" placeholder="Name"/>
                    {touched.name && errors.name && (
                        <p className = "error">{errors.name}</p>
                    )}
                <Field type="text" name="email" placeholder="Email"/>
                    {touched.email && errors.email &&(
                        <p className="error">{errors.email}</p>
                    )}
                 <Field type="password" name="password" placeholder="Password"/>
                    {touched.password && errors.password &&(
                        <p className="error">{errors.password}</p>
                    )}
                <label>
                    TOS
                    <Field
                        type="checkbox"
                        name="Terms Of Service"
                        checked={values.TOS}
                        />
                </label>
                        <button >Submit</button>
            </Form>
            {users.map(user =>(
                <ul key={user.id}>
                    <li>Name:{user.name}</li>
                    <li>Email:{user.email}</li>
                    <li>Password:{user.password}</li>
                </ul>
            ))}
   
        </div>
    );
};
const FormikUserForm = withFormik({
mapPropsToValues({ name, email, password, TOS}) {
    return{
        name: name || "",
        email: email || "",
        password: password || "",
        TOS: TOS || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("enter a name"),
        email: Yup.string().required("email required"),
        password: Yup.string().required("password required")
    }),
    handleSubmit(values, { setStatus }) {
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
          })
          .catch(err => console.log(err.res));
      }
})(UserForm);
console.log("here you are", FormikUserForm)



export default FormikUserForm;