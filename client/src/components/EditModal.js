import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

class EditModal extends Component {
  state = {
    modal: false,
    name: this.props.name,
    author: this.props.author,
    category: this.props.category,
    current_chapter: this.props.current_chapter,
    current_page: this.props.current_page,
    total_pages: this.props.total_pages,
    modal_form: "Edit"
  }

  toggle = () => {
    this.setState(() => {
      return {
        modal: !this.state.modal
      }
    });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const modifiedBook = {
      _id: this.props._id,
      id: this.props.id,
      name: this.state.name,
      author: this.state.author,
      category: this.state.category,
      current_chapter: this.state.current_chapter,
      current_page: this.state.current_page,
      total_pages: this.state.total_pages
    }

    // Edit book via updateBook action:
    this.props.updateBook(modifiedBook);

    // Close modal:
    this.toggle();
  };

  render() {

    let formgroup;
    if (this.state.modal_form === "Edit") {
      formgroup = (
        <FormGroup>
          <Label for="title">Заглавие:</Label>
          <Input
            type="text"
            name="name"
            id="title"
            placeholder="Пример: Властелинът на пръстените"
            value={this.state.name}
            onChange={this.onChange}
          />
          <Label for="author">Автор:</Label>
          <Input
            type="text"
            name="author"
            id="author"
            placeholder="Пример: Дж. Р. Р. Толкин"
            value={this.state.author}
            onChange={this.onChange}
          />
          <Label for="total_pages">Страници:</Label>
          <Input
            type="number"
            name="total_pages"
            id="total_pages"
            placeholder="Пример: 394"
            value={this.state.total_pages}
            onChange={this.onChange}
          />
          <Label for="category">Категория:</Label>
          <Input
            type="select"
            name="category"
            id="category"
            onChange={this.onChange}
            value={this.state.category}
          >
          {this.props.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </Input>
          <Button
            color="dark"
            style={{marginTop: '2rem'}}
            block
          >
            Добави
          </Button>
        </FormGroup>
      )
    } else {
      formgroup = (
        <FormGroup>
          <Label for="current_chapter">Текуща глава:</Label>
          <Input
            type="text"
            name="current_chapter"
            id="current_chapter"
            placeholder="Пример: Глава 1 - Името на главата"
            value={this.state.current_chapter}
            onChange={this.onChange}
          />
          <Label for="current_page">Текуща страница:</Label>
          <Input
            type="number"
            name="current_page"
            id="current_page"
            placeholder="Example: 50"
            value={this.state.current_page}
            onChange={this.onChange}
            max={this.state.total_pages}
          />
          <Button
            color="dark"
            style={{marginTop: '2rem'}}
            block
          >Добави
          </Button>
        </FormGroup>
      )
    }

    return (
      <div>
        {/*EDIT BUTTON*/}
        <Button
          className="edit-button"
          size="sm"
          onClick={() => {
              this.setState(() => {
                return { modal_form: "Edit" }
              });
              this.toggle();
          }}
        >
        Добави
        </Button>

        {/*Записки*/}
        <Button
          className="update-progress-button"
          color="secondary"
          size="sm"
          onClick={() => {
              this.setState(() => {
                return { modal_form: "Progress" }
              });
              this.toggle();
          }}
        >
          Записки
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
          Редактирайте съществуващата си книга
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              { formgroup }
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

EditModal.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  current_chapter: PropTypes.string,
  current_page: PropTypes.number.isRequired,
  total_pages: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  id: PropTypes.string,
  updateBook: PropTypes.func.isRequired
}

export default connect(null, { updateBook })(EditModal);
