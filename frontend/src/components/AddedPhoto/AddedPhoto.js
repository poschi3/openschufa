import React, { Component } from 'react';
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  injectIntl,
} from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { STEP_FORM } from '../../constants';
import ProgressBar from '../ProgressBar';

const PHOTO = 'photo';
const PDF = 'pdf';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  button: {
    width: '10rem',
  },
  centerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

const messages = defineMessages({
  documentAdded: {
    id: 'AddedPhoto.subheading',
    defaultMessage: 'Your {documentType} has been added.',
  },
  photo: {
    id: 'AddedPhoto.photo',
    defaultMessage: 'photo',
  },
  pdf: {
    id: 'AddedPhoto.pdf',
    defaultMessage: 'pdf',
  },
});

class AddedPhoto extends Component {
  onChange = e => {
    const { selectFile } = this.props;
    const input = e.currentTarget;
    const file = input.files[0];
    selectFile(file);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes, setActiveStep, imageData } = this.props;
    const documentTypes = imageData.map(
      data => (typeof data === 'string' ? PHOTO : PDF)
    );
    const numberOfPhotos = documentTypes.filter(t => t === PHOTO).length;
    const numberOfPdfs = documentTypes.filter(t => t === PDF).length;
    const lastDocumentType = documentTypes[documentTypes.length - 1];

    return (
      <div style={{ marginTop: 6, textAlign: 'center' }}>
        <Paper className={classes.root} elevation={0}>
          <ProgressBar stepsFinished={numberOfPhotos > 1 ? 2 : 1} />
          {lastDocumentType && (
            <Typography
              className={classes.centerContainer}
              variant="subheading"
              gutterBottom
            >
              {formatMessage(messages.documentAdded, {
                documentType: formatMessage(messages[lastDocumentType]),
              })}
            </Typography>
          )}
          <Typography variant="body1">
            {numberOfPhotos > 0 && (
              <FormattedMessage
                id="AddedPhoto.numberofphotos"
                defaultMessage={`You've added a total of {count} {photos}.`}
                values={{
                  count: (
                    <b>
                      <FormattedNumber value={numberOfPhotos} />
                    </b>
                  ),
                  photos: (
                    <FormattedPlural
                      value={numberOfPhotos}
                      one={
                        <FormattedMessage
                          id="AddedPhoto.photosuffix"
                          defaultMessage="photo"
                        />
                      }
                      other={
                        <FormattedMessage
                          id="AddedPhoto.photossuffix"
                          defaultMessage="photos"
                        />
                      }
                    />
                  ),
                }}
              />
            )}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {numberOfPdfs > 0 && (
              <FormattedMessage
                id="AddedPhoto.numberofpdfs"
                defaultMessage={`You've added a total of {count} {documents}.`}
                values={{
                  count: (
                    <b>
                      <FormattedNumber value={numberOfPdfs} />
                    </b>
                  ),
                  documents: (
                    <FormattedPlural
                      value={numberOfPdfs}
                      one={
                        <FormattedMessage
                          id="AddedPhoto.pdfsuffix"
                          defaultMessage="pdf document"
                        />
                      }
                      other={
                        <FormattedMessage
                          id="AddedPhoto.pdfssuffix"
                          defaultMessage="pdf documents"
                        />
                      }
                    />
                  ),
                }}
              />
            )}
          </Typography>
          <div
            className={classes.centerContainer}
            style={{ marginTop: '2rem' }}
          >
            <Button
              color="primary"
              variant="raised"
              component="label"
              className={classes.button}
            >
              <span style={{ textTransform: 'none', color: 'white' }}>
                <FormattedMessage
                  id="AddPhoto.addphoto"
                  defaultMessage="Another photo"
                />
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={this.onChange}
                style={{ display: 'none' }}
              />
            </Button>
          </div>
          <Typography variant="body1" gutterBottom />
          <div
            className={classes.centerContainer}
            style={{ marginTop: '2rem' }}
          >
            <Button
              color="secondary"
              variant="raised"
              className={classes.button}
              onClick={() => setActiveStep(STEP_FORM)}
            >
              <span style={{ textTransform: 'none' }}>
                <FormattedMessage
                  id="AddPhoto.survey"
                  defaultMessage="To survey"
                />
              </span>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(injectIntl(AddedPhoto));
