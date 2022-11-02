import React from "react";
import { Container } from "../../layouts/Header/styles";

import { Steps } from "antd";

function CheckoutPage() {
  const { Step } = Steps;

  return (
    <div>
      <Container>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step
            title="In Progress"
            subTitle="Left 00:00:08"
            description="This is a description."
          />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </Container>
    </div>
  );
}

export default CheckoutPage;
