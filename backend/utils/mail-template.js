const HTML_TEMPLATE = ({ dept_name, camera, alarm_type }, date, time) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Email From Sudisa</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>Safety Violation</h1>
              </div>
              <div class="email-body">
                <p>A safety violation has been identified within your organization, please find the attached screenshot for your reference.</p>
                <h4>Incident Details:</h4>
                <p>Date and Time of Violation: ${date} ${time}</p>
                <p>Camera: ${camera}</p>
                <p>Please check the dashboard for further information.</p>
              </div>
              <div class="email-footer">
                <p>Don't reply to this mail.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

module.exports = HTML_TEMPLATE;
