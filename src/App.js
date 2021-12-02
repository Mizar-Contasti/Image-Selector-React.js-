import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./App.css";

// const accessKey = "mFDak68fwM-aVVL-_4GMkOMWE_CyIDtO_cRvZ8Xw5bk";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url);
  console.log({ photos });
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID mFDak68fwM-aVVL-_4GMkOMWE_CyIDtO_cRvZ8Xw5bk",
                },
              }
            );

            const data = await response.json();

            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img alt={photo.alt_description} src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
