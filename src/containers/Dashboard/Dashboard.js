import React, { Component } from 'react';
import { connect } from 'react-redux';



class Dashboard extends Component {

    shouldComponentUpdate(nextProps) {
        if(JSON.stringify(this.props.wkLevels) === JSON.stringify(nextProps.wkLevels)) {
            return false;
        } else {
            return true;
        }
    }

    componentDidUpdate() {
        if(this.props.wkLevels) {
            let downloadText = this.createTextFile();
            let fileObject = new Blob([downloadText], {type: 'data:text/plain;charset=shift-jis'});
            let url = window.URL.createObjectURL(fileObject);
            document.getElementById('downloadVocab').href = url;
        }
    }

    createTextFile = () => {
        let text = '';
        Object.values(this.props.wkLevels).forEach(level => {
            Object.values(level.vocabList).forEach((vocab, index) => {
                if(vocab.srsStage >= 5) {
                    if((index === Object.values(level.vocabList).length-1)) {
                        text += vocab.value;
                    } else {
                        text += vocab.value + '\n';
                    }
                }
            });
        });
        return text;
    };

    componentDidMount() {
    }

    render() {
        return (
            <div>
                Dashboard
                <button><a id="downloadVocab" download="wanikani.external.txt" href="">Download Known Vocab List</a></button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        wkLevels: state.wanikani.wkLevels
    }
}

export default connect(mapStateToProps)(Dashboard);