const AboutPage = () => {
  return (
    <div class='container mt-5 p-3 d-flex justify-content-center '>
      <div class='row justify-content-center p-3'>
        <div class='col-12 pb-5'>
          <div class='card border-primary'>
            <div class='card-header rounded-3'>
              <div class='bg-dark text-white text-center py-3'>
                <h3>
                  <i class='fa fa-envelope'></i> About
                </h3>
                <p class='m-0'>Developers Contact Info</p>
              </div>
            </div>
            <div class='card-body p-4 h4'>
              <div class='form-group'>
                <div class='input-group mb-5'>
                  <div class='input-group-prepend'>
                    <div class='input-group-text'>
                      <i class='fa fa-user text-info'></i>
                    </div>
                  </div>
                  <span class='form-control text-center'>Ibrahim Abdullah</span>
                </div>
              </div>
              <div class='form-group'>
                <div class='input-group mb-5'>
                  <div class='input-group-prepend'>
                    <div class='input-group-text'>
                      <i class='fa fa-envelope text-info'></i>
                    </div>
                  </div>
                  <span class='form-control text-center'>
                    ibrahimabdull93@gmail.com
                  </span>
                </div>
              </div>

              <div class='form-group'>
                <div class='input-group mb-1'>
                  <div class='input-group-prepend'>
                    <div class='input-group-text'>
                      <i class='fa fa-comment text-info'></i>
                    </div>
                  </div>
                  <span class='form-control text-center'>
                    https://github.com/abewallah
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
