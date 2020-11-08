import React, { useState } from "react";
import Head from "next/head";
import Dropdown from "../src/ui/Dropdown";

// types
import { userInfo } from "../src/interfaces";
// styles
import styles from "../styles/index.module.scss";

const IndexPage = () => {
  const [formData, setFormData] = useState<userInfo>({
    gender: "",
  });

  // A string array representing any wrong inputs. (not used in this example)
  // const [wrongs, setWrongs] = useState<string[]>([]);

  return (
    <>
      <Head>
        <title>Absolute Dropdown</title>
      </Head>
      <div className={styles.container}>
        <Dropdown
          name="gender"
          formData={formData}
          setFormData={setFormData}
          label="Gender"
          list={["Male", "Female", "Others", "Ohters"]}
          placeholder="Select Your Gender"
        />
      </div>
    </>
  );
};

export default IndexPage;
