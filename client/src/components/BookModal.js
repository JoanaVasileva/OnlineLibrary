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
import { addBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

class BookModal extends Component {
  state = {
    modal: false,
    name: '',
    author: '',
    category: 'Action',
    current_chapter: '',
    current_page: 0,
    total_pages: 300,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      name: this.state.name,
      author: this.state.author,
      category: this.state.category,
      current_chapter: this.state.current_chapter,
      current_page: this.state.current_page,
      total_pages: this.state.total_pages,
      user_id: this.props.user_id
    }

    // Add book via addBook action:
    this.props.addBook(newBook);

    // Close modal:
    this.toggle();
  };

  render() {
    return (
      <div>

      <h2 className="display-4 text-center">Моята библиотека</h2>
              <p className="lead text-center">
               Ви носи редица предимства, като ви дава възможност да
               добавите книги, който желаете да прочетете и да добавите кратка информация към тях. 
              </p>

        <Button
          color="secondary"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >
        Добави книга
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
          Добави книга в твоята библиотека
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit} className="form">
              <FormGroup>
                <Label for="title">Заглавие:</Label>
                <Input
                  color="black"
                  type="text"
                  name="name"
                  id="title"
                  placeholder="Пример: Властелинът на пръстените"
                  onChange={this.onChange}
                />
                <Label for="author">Автор:</Label>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Пример: Дж. Р. Р. Толкин"
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
                 Добави книга
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

BookModal.propTypes = {
  categories: PropTypes.array.isRequired,
  user_id: PropTypes.string,
  addBook: PropTypes.func.isRequired
}

export default connect(null, { addBook })(BookModal);
