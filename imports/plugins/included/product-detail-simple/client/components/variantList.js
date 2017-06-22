import React, { Component, PropTypes } from "react";
import Variant from "./variant";
import { EditContainer } from "/imports/plugins/core/ui/client/containers";
import { Divider, IconButton } from "/imports/plugins/core/ui/client/components";
import { ChildVariant } from "./";
import variantListStyle from "./variantList.css";

class VariantList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDigital: props.isDigital || false
    };

    this.isValidUrl = this.isValidUrl.bind(this);
    this.updateDownloadUrl = this.updateDownloadUrl.bind(this);
    this.showProductDownloadUrlInput = this.showProductDownloadUrlInput.bind(this);
    this.toggleDigitalProduct = this.toggleDigitalProduct.bind(this);
    this.showDigitalProductToggler = this.showDigitalProductToggler.bind(this);
  }

  handleVariantEditClick = (event, editButtonProps) => {
    if (this.props.onEditVariant) {
      return this.props.onEditVariant(event, editButtonProps.data);
    }
    return true;
  }

  handleVariantVisibilityClick = (event, editButtonProps) => {
    if (this.props.onVariantVisibiltyToggle) {
      const isVariantVisible = !editButtonProps.data.isVisible;
      this.props.onVariantVisibiltyToggle(event, editButtonProps.data, isVariantVisible);
    }
  }

  handleChildleVariantClick = (event, variant) => {
    if (this.props.onVariantClick) {
      this.props.onVariantClick(event, variant, 1);
    }
  }

  handleChildVariantEditClick = (event, editButtonProps) => {
    if (this.props.onEditVariant) {
      return this.props.onEditVariant(event, editButtonProps.data, 1);
    }
    return true;
  }

  isSoldOut(variant) {
    if (this.props.isSoldOut) {
      return this.props.isSoldOut(variant);
    }

    return false;
  }

  isValidUrl(testUrl) {
    if (/(\.){2,}/.test(testUrl)) {
      return [false];
    }
    if (/(\.)$/.test(testUrl)) {
      return [false];
    }

    const trimmedUrl = $.trim(testUrl);
    /*
      Regex used is courtesy of Diego Perrini. Link is:
      https://gist.github.com/dperini/729294

      To know why this test was chosen, see this comparison table:
      https://mathiasbynens.be/demo/url-regex
    */
    const correctUrlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const isUrlValid = correctUrlPattern.test(trimmedUrl);
    if (!isUrlValid) {
      return [false];
    }

    return [isUrlValid, trimmedUrl];
  }

  updateDownloadUrl(e) {
    const target = e.target;
    const targetElement = $(target);
    const validityResults = this.isValidUrl(target.value);
    const isUrlValid = validityResults[0];
    if (!isUrlValid) {
      targetElement.removeClass("validUrl");
      targetElement.addClass("invalidUrl");
      return;
    }
    targetElement.removeClass("invalidUrl");
    targetElement.addClass("validUrl");
    const validUrl = validityResults[1];
    this.props.onProductFieldChange(
      this.props.product._id,
      "digitalDownloadLink",
      validUrl
    );
  }

  showProductDownloadUrlInput() {
    if (!this.state.isDigital) {
      return null;
    }

    return (
      <div className="rui textfield form-group">
        <input
          id="productDownloadUrl"
          type="text"
          className="textfield"
          placeholder={this.props.product.digitalDownloadLink || "Download link..."}
          onChange={this.updateDownloadUrl}
        />
      </div>
    );
  }

  toggleDigitalProduct(e) {
    const isDigitalProduct = e.target.checked;
    this.setState({ isDigital: isDigitalProduct });
    this.props.onProductFieldChange(
      this.props.product._id,
      "isDigital",
      isDigitalProduct
    );
  }

  showDigitalProductToggler() {
    if (this.props.hasAdminPermission) {
      return (
        <div className="rui form-group">
          <label>Digital product?
          </label>
          <input
            id="digital"
            className="checkbox-switch"
            type="checkbox"
            defaultChecked={this.state.isDigital}
            onChange={this.toggleDigitalProduct}
          />
          {this.showProductDownloadUrlInput()}
        </div>
      );
    }

    return null;
  }

  renderVariants() {
    let variants = [];
    let addButton;

    if (this.props.editable) {
      addButton = (
        <div className="rui items flex">
          <div className="rui item full justify center">
            <IconButton
              i18nKeyTooltip="variantList.createVariant"
              icon="fa fa-plus"
              primary={true}
              tooltip="Create Variant"
              onClick={this.props.onCreateVariant}
            />
          </div>
        </div>
      );
    }

    if (this.props.variants) {
      variants = this.props.variants.map((variant, index) => {
        const displayPrice = this.props.displayPrice && this.props.displayPrice(variant._id);

        return (
          <EditContainer
            data={variant}
            disabled={this.props.editable === false}
            editView="variantForm"
            i18nKeyLabel="productDetailEdit.editVariant"
            key={index}
            label="Edit Variant"
            onEditButtonClick={this.handleVariantEditClick}
            onVisibilityButtonClick={this.handleVariantVisibilityClick}
            permissions={["createProduct"]}
            showsVisibilityButton={true}
          >
            <Variant
              displayPrice={displayPrice}
              editable={this.props.editable}
              index={index}
              isSelected={this.props.variantIsSelected(variant._id)}
              onClick={this.props.onVariantClick}
              onMove={this.props.onMoveVariant}
              soldOut={this.isSoldOut(variant)}
              variant={variant}
            />
          </EditContainer>
        );
      });
    }

    const variantList = (
      <ul className="variant-list list-unstyled" id="variant-list" key="variantList">
        {this.showDigitalProductToggler()}
        {variants}
        {addButton}
      </ul>
    );

    if (variants.length === 0 && this.props.editable === false) {
      return variantList;
    } else if (variants.length > 1 || variants.length === 0) {
      return [
        <Divider
          i18nKeyLabel="productDetail.options"
          key="dividerWithLabel"
          label="Options"
        />,
        variantList
      ];
    } else if (variants.length === 1) {
      return [
        <Divider key="divider" />,
        variantList
      ];
    }

    return variantList;
  }

  renderChildVariants() {
    let childVariants = [];

    if (this.props.childVariants) {
      childVariants = this.props.childVariants.map((childVariant, index) => {
        const media = this.props.childVariantMedia.filter((mediaItem) => {
          if (mediaItem.metadata.variantId === childVariant._id) {
            return true;
          }
          return false;
        });

        return (
          <EditContainer
            data={childVariant}
            disabled={this.props.editable === false}
            editView="variantForm"
            i18nKeyLabel="productDetailEdit.editVariant"
            key={index}
            label="Edit Variant"
            onEditButtonClick={this.handleChildVariantEditClick}
            onVisibilityButtonClick={this.handleVariantVisibilityClick}
            permissions={["createProduct"]}
            showsVisibilityButton={true}
          >
            <ChildVariant
              isSelected={this.props.variantIsSelected(childVariant._id)}
              media={media}
              onClick={this.handleChildleVariantClick}
              variant={childVariant}
            />
          </EditContainer>
        );
      });
    }

    if (childVariants.length) {
      return [
        <Divider
          key="availableOptionsDivider"
          i18nKeyLabel="productDetail.availableOptions"
          label="Available Options"
        />,
        <div className="row variant-product-options" key="childVariantList">
          {childVariants}
        </div>
      ];
    }

    return null;
  }

  render() {
    return (
      <div className="product-variants">
        {this.renderVariants()}
      </div>
    );
  }
}

VariantList.propTypes = {
  _id: PropTypes.string,
  childVariantMedia: PropTypes.arrayOf(PropTypes.any),
  childVariants: PropTypes.arrayOf(PropTypes.object),
  displayPrice: PropTypes.func,
  editable: PropTypes.bool,
  isDigital: PropTypes.bool,
  isSoldOut: PropTypes.func,
  onCreateVariant: PropTypes.func,
  onEditVariant: PropTypes.func,
  onMoveVariant: PropTypes.func,
  onProductFieldChange: PropTypes.func,
  onVariantClick: PropTypes.func,
  onVariantVisibiltyToggle: PropTypes.func,
  variantIsSelected: PropTypes.func,
  variants: PropTypes.arrayOf(PropTypes.object)
};

export default VariantList;
