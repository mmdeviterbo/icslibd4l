return (
  <div className="add-res-form-cont">
    <form id="mainForm" onSubmit={handleSubmit}>
      {/* Primary  Info */}
      <div className="res-primary-info">
        <h2>
          <b>Primary Info</b>
        </h2>
        <hr />

        <div className="primaryfields">
          <label htmlFor="resId">ID: &nbsp; </label>
          <input
            required
            type="text"
            id="resId"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </div>

        <div className="primaryfields">
          <label htmlFor="resTitle">Title: &nbsp; </label>
          <input
            type="text"
            id="resTitle"
            required
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        {/* <AddAuthorField/> */}
        <h5>Author(s):</h5>
        <div className="primaryfields">
          <label htmlFor="resAuthor">
            &nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp;{" "}
          </label>

          <input
            type="text"
            id="resAuthorFN"
            name="fname"
            required
            value={author.fname}
            onChange={addAuthor}
          />
        </div>

        <div className="primaryfields">
          <label htmlFor="resAuthor">
            &nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp;{" "}
          </label>
          <input
            type="text"
            id="resAuthorLN"
            required
            name="lname"
            value={author.lname}
            onChange={addAuthor}
          />
        </div>
        <button id="addAuthor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Add Author
        </button>
      </div>

      <div className="spthesisform">
        <h2>
          <b>SP / Thesis</b>
        </h2>
        <hr />

        <div className="classifSelect">
          <br />
          Classification:
          <Select
            id="resClassification"
            // defaultValue={"Select..."}
            options={classificationOptions}
            value={classificationOptions.find((obj) => obj.value === type)}
            onChange={handleTypeChange}
          ></Select>
        </div>

        <h5
          style={{
            fontWeight: "normal",
            fontFamily: "Montserrat",
          }}
        >
          Adviser(s):
        </h5>

        <div className="selectadvisers">
          <Select
            id="advsel"
            options={adviserchoices}
            value={adviserchoices.find((obj) => obj.value === adviser)}
            //   onChange={handleAdviserChange}
            onChange={(adviser) => handleAdviserChange(adviser)}
            isMulti
          ></Select>
        </div>
        <br />
        <div>
          <h5
            style={{
              fontWeight: "normal",
              fontFamily: "Montserrat",
            }}
          >
            ... or enter Abstract here:
          </h5>
          <textarea
            id="abstractText"
            onChange={(event) => {
              setAbstract(event.target.value);
            }}
          />
        </div>

        <div className="spthesisfiles">
          <h5>Upload Source Code</h5>
          <input
            type="file"
            className="resourcefiles"
            id="spthesisJournal"
            onChange={(e) => {
              handleSourceCode(e);
            }}
          />
        </div>

        <div className="spthesisfiles">
          <h5>Upload Manuscript</h5>
          <input
            type="file"
            className="resourcefiles"
            id="spthesisManuscript"
            onChange={(e) => {
              handleManuscript(e);
            }}
          />
        </div>

        <div className="spthesisfiles">
          <h5>Upload Journal</h5>
          <input
            type="file"
            className="resourcefiles"
            id="spthesisJournal"
            onChange={(e) => {
              handleJournal(e);
            }}
          />
        </div>

        <div className="spthesisfiles">
          <h5>Upload Poster</h5>
          <input
            type="file"
            className="resourcefiles"
            id="spthesisPoster"
            onChange={(e) => {
              handlePoster(e);
            }}
          />
        </div>

        <div class="primaryfields">
          <label for="resId">Keywords: &nbsp; </label>
          <ChipInput onChange={(chips) => handleChips(chips)} />
        </div>
      </div>

      <button type="submit" id="saveResource">
        Save
      </button>
    </form>
  </div>
);
