import React, { Component } from 'react';

export default class Comment extends Component {
    constructor(){
        super()
            this.state ={
    
                text:'',

            
        }
        this.updateText = this.updateText.bind(this);
    }


    updateText(event){
        this.setState({text:event.target.value});
        console.log(this.state.text);
    }

    // createComment() {
    //         axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
    //           this.setState({ posts: results.data });
    //         });
    //       }

    

    render() {
        return(
        <div>
            <input className='info-box'
             placeholder ="Give your thoughts!!"
            value = {this.state.text}
            onChange={this.updateText}/>

                       <button onClick ={this.state.createComment}> Comment </button>
            </div>

    
            
        );
    }
}