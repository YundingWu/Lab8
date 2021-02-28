describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', ()=>{
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then($el=>{
      expect($el).to.have.value(75);
    });
  });

  it('volume input changes when slider changes', ()=>{
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#volume-number').then($el=>{
      expect($el).to.have.value(33);
    })
  });

  it('volume of audio changes when slider changes', ()=>{
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#horn-sound').then($el=>{
      expect($el).to.have.prop('volume',0.33);
    })
  });

  it('party horn radio button changes resources', ()=>{
    cy.get('#radio-party-horn').check();
    cy.get('#sound-image').then($el=>{
      expect($el).to.to.have.attr('src','./assets/media/images/party-horn.svg');
    });
    cy.get('#horn-sound').then($el=>{
      expect($el).to.to.have.attr('src','./assets/media/audio/party-horn.mp3');
    });
  });

  it('increasing volume change volume images', ()=>{
    cy.get('#volume-slider').invoke('val',67).trigger('input');
    cy.get('#volume-image').then($el=>{
      expect($el).to.to.have.attr('src','./assets/media/icons/volume-level-3.svg');
    });

    cy.get('#volume-slider').invoke('val',34).trigger('input');
    cy.get('#volume-image').then($el=>{
      expect($el).to.to.have.attr('src','./assets/media/icons/volume-level-2.svg');
    });

    cy.get('#volume-slider').invoke('val',1).trigger('input');
    cy.get('#volume-image').then($el=>{
      expect($el).to.to.have.attr('src','./assets/media/icons/volume-level-1.svg');
    });

    cy.get('#volume-slider').invoke('val',0).trigger('input');
    cy.get('#volume-image').then($el=>{
      expect($el).to.to.have.attr('src','./assets/media/icons/volume-level-0.svg');
    });
  })

  it('honk button disabled when textbox is empty or non-number',()=>{
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then($el=>{
      expect($el).to.have.prop('disabled',true);
    });

    cy.get('#volume-number').clear().type('test');
    cy.get('#honk-btn').then($el=>{
      expect($el).to.have.prop('disabled',true);
    });
  });

  it('show error when a number outside of range is typed', ()=> {
    cy.get('#volume-number').clear().type('101');
    cy.get('input:invalid').then($el=>{
      expect($el.length).to.equal(1);
    });

    cy.get('#volume-number').clear().type('-1');
    cy.get('input:invalid').then($el=>{
      expect($el.length).to.equal(1);
    });
  });
});